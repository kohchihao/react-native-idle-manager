import { useEffect, useRef, useState } from 'react';
import { Keyboard, PanResponder } from 'react-native';

type UseIdleManagerProp = {
  idleDuration: number; // in "ms",
  checkIdleFrequency: number; // in ms;
  callback?: () => void;
};

const useIdleManager = ({
  idleDuration = 5000,
  checkIdleFrequency = 500,
  callback,
}: UseIdleManagerProp) => {
  const lastInteraction = useRef(new Date());
  const inactivityTimer = useRef<ReturnType<typeof setInterval>>();
  const [isInActive, setIsInActive] = useState(false);

  useEffect(() => {
    maybeStartWatchingForInactivity();
  }, []);

  // To keep track of keyboard. This is a hack to know if the user did try to type something or not?
  // This can roughly gauge if the user is idle or not.
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsActive();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsActive();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const setIsActive = () => {
    lastInteraction.current = new Date();
    if (isInActive) {
      setIsInActive(false);
    }

    maybeStartWatchingForInactivity();
  };

  const setIsInactive = () => {
    callback?.();
    setIsInActive(true);
    clearInterval(inactivityTimer.current);
    inactivityTimer.current = undefined;
  };

  const maybeStartWatchingForInactivity = () => {
    if (inactivityTimer.current) {
      return;
    }

    inactivityTimer.current = setInterval(() => {
      const currentTime = new Date().valueOf();
      const lastInteractionTime = lastInteraction.current.valueOf();
      if (currentTime - lastInteractionTime >= idleDuration) {
        setIsInactive();
      }
    }, checkIdleFrequency);
  };

  const handleStartShouldSetPanResponder = () => {
    setIsActive();
    return false;
  };

  const handleMoveShouldSetPanResponder = () => {
    setIsActive();
    return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
    onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderTerminationRequest: () => true,
    onShouldBlockNativeResponder: () => false,
  });

  const resetTimer = () => {
    setIsActive();
  };

  return {
    panResponder,
    isInActive,
    resetTimer,
  };
};

export default useIdleManager;
