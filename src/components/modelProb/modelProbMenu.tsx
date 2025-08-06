import { component$ } from "@qwik.dev/core";
import {
  ModelProbLevel,
  ModelProbVar,
  ModelProbDateRun,
  ModelProbLocation,
  ModelProbStatistic,
} from "../modelProb";
import { Accordion } from "@qwik-ui/headless";

export interface ModelProbProps {
  class?: string;
  updating?: boolean;
  store: {
    imgPathMDA: string;
    model: string;
    datarun: string;
    level: string;
    run: string;
    variable: string;
    step: string;
    location: string;
    lastButton: string;
    statistic: string;
    ext: string;
  };
}

export const ModelProbMenu = component$<ModelProbProps>((props) => {
  return (
    <Accordion.Root multiple class={props.class}>
      <Accordion.Item class="w-full" key="1" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>data run</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelProbDateRun store={props.store} />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item class="w-full" key="2" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>località</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelProbLocation store={props.store}></ModelProbLocation>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item class="w-full" key="4" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>livello</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelProbLevel store={props.store}></ModelProbLevel>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item class="w-full" key="6" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>variabile</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelProbVar store={props.store}></ModelProbVar>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item class="w-full" key="6" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>modo</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelProbStatistic store={props.store}></ModelProbStatistic>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
});
