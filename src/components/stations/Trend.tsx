import { component$ } from "@qwik.dev/core";
import { calculateTrendSvg } from "~/routes/(authenticated)/stazioni/layout";

export interface TrendProps {
  vals: number[];
}

export const Trend = component$<TrendProps>((props) => {
  const trend = calculateTrendSvg(props.vals);
  return (
    <span
      title={"ultimi valori: " + props.vals.join("  ")}
      class="cursor-help px-2"
    >
      {trend === 0 ? (
        <span class="p-1 text-xl text-blue-600">=</span>
      ) : trend < 0 ? (
        <span class="p-1 text-xl text-green-600">▲</span>
      ) : (
        <span class="p-1 text-xl text-red-600">▼</span>
      )}
    </span>
  );
});
