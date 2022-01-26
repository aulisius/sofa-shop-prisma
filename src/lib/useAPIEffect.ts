import { useMemo, useState } from "react";

export let LoadingEffect = Symbol.for("loading");
export let CompletedEffect = Symbol.for("done");

type APIStatus = {
  readonly isFetching: boolean;
  readonly isCompleted: boolean;
  readonly isSettled: boolean;
  readonly errors: Error | null;
};

function getAPIStatus(loadingState: symbol | Error): APIStatus {
  return {
    get isFetching() {
      return loadingState === LoadingEffect;
    },
    get isCompleted() {
      return loadingState === CompletedEffect;
    },
    get isSettled() {
      return loadingState !== LoadingEffect;
    },
    get errors() {
      return loadingState instanceof Error ? loadingState : null;
    },
  };
}

type EffectHandler = (effect: () => Promise<any>) => Promise<any>;

let fn = () => useState<symbol | Error>();

export function useAPIEffect([state, setState]: ReturnType<typeof fn>): [
  APIStatus,
  EffectHandler
] {
  let apiStatus = useMemo(() => getAPIStatus(state), [state]);
  async function addEffectHandlers(effectProducer: () => Promise<any>) {
    setState(LoadingEffect);
    try {
      await effectProducer();
      setState(CompletedEffect);
      return null;
    } catch (error) {
      setState(error);
      return error;
    } finally {
      setTimeout(() => setState(null), 2000);
    }
  }
  return [apiStatus, addEffectHandlers];
}
