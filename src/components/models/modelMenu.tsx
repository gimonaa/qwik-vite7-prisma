import { component$ } from "@qwik.dev/core";
import {
  ModelList,
  ModelLevel,
  ModelVar,
  ModelDateRun,
  ModelVarCum,
  ModelDomain,
} from "../models";
import { Accordion } from "@qwik-ui/headless";

export interface ModelProps {
  class?: string;
  updating?: boolean;
  store: {
    imgPath: string;
    imgPathMDA: string;
    model: string;
    datarun: string;
    level: string;
    run: string;
    variable: string;
    varCum: string;
    step: string;
    domain: string;
    lastButton: string;
    ext: string;
  };
}

export const ModelMenu = component$<ModelProps>((props) => {
  return (
    <Accordion.Root multiple class={props.class}>
      <Accordion.Item class="w-full" key="1" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>data run</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelDateRun store={props.store} />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item class="w-full" key="2" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>dominio</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelDomain store={props.store}></ModelDomain>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item class="w-full" key="3" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>modello</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelList store={props.store} />
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item class="w-full" key="4" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>livello</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelLevel store={props.store}></ModelLevel>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item class="w-full" key="5" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>cumulate (h)</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelVarCum store={props.store}></ModelVarCum>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item class="w-full" key="6" open>
        <Accordion.Header class="g-accordion">
          <Accordion.Trigger>variabile</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <ModelVar store={props.store}></ModelVar>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
});
