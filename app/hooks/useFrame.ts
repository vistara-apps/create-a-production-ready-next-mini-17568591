'use client';

import { useState, useEffect, useCallback } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { errorReporter } from '@/app/lib/errorReporting';
import { logger } from '@/app/lib/logger';

/**
 * Frame state
 */
export interface FrameState {
  step: number;
  data?: Record<string, unknown>;
}

/**
 * Hook for Farcaster frame interactions
 * 
 * @returns Frame state and methods
 */
export function useFrame() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [frameState, setInternalFrameState] = useState<FrameState>({
    step: 1,
    data: {},
  });
  
  // Initialize frame
  useEffect(() => {
    try {
      setFrameReady();
      logger.info('Frame initialized');
    } catch (error) {
      errorReporter.report(error, 'medium');
      logger.error('Failed to initialize frame', error instanceof Error ? error : new Error(String(error)));
    }
  }, [setFrameReady]);
  
  // Update frame state
  const setFrameState = useCallback((newState: FrameState) => {
    setInternalFrameState(newState);
    logger.info('Frame state updated', { newState });
  }, []);
  
  // Navigate to a different frame
  const navigateToFrame = useCallback((frameUrl: string) => {
    try {
      // In a real application, this would use MiniKit to navigate to a different frame
      // This is a placeholder implementation
      window.location.href = frameUrl;
      logger.info('Navigated to frame', { frameUrl });
    } catch (error) {
      errorReporter.report(error, 'medium', { frameUrl });
      logger.error('Failed to navigate to frame', error instanceof Error ? error : new Error(String(error)));
    }
  }, []);
  
  // Go to the next step
  const nextStep = useCallback(() => {
    setInternalFrameState((prevState) => ({
      ...prevState,
      step: prevState.step + 1,
    }));
    logger.info('Advanced to next step', { newStep: frameState.step + 1 });
  }, [frameState.step]);
  
  // Go to the previous step
  const prevStep = useCallback(() => {
    setInternalFrameState((prevState) => ({
      ...prevState,
      step: Math.max(1, prevState.step - 1),
    }));
    logger.info('Returned to previous step', { newStep: Math.max(1, frameState.step - 1) });
  }, [frameState.step]);
  
  // Go to a specific step
  const goToStep = useCallback((step: number) => {
    setInternalFrameState((prevState) => ({
      ...prevState,
      step: Math.max(1, step),
    }));
    logger.info('Navigated to specific step', { step });
  }, []);
  
  // Update frame data
  const updateFrameData = useCallback((data: Record<string, unknown>) => {
    setInternalFrameState((prevState) => ({
      ...prevState,
      data: { ...prevState.data, ...data },
    }));
    logger.info('Updated frame data', { data });
  }, []);
  
  return {
    frameState,
    setFrameState,
    navigateToFrame,
    isFrameReady,
    nextStep,
    prevStep,
    goToStep,
    updateFrameData,
  };
}

