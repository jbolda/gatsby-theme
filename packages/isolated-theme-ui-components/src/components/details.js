/** @jsx jsx */
import { jsx } from "../context";

export default ({ items }) =>
  items.map(item => (
    <div key={item.label}>
      <p>
        <span>
          {item.label}
          {": "}
        </span>
        <span>{check(item.label)(item.detail)}</span>
      </p>
    </div>
  ));

const checkBlank = value => (value ? value : `--`);
const checkBlankTime = value => (value ? `${value}` : `--`);
const check = label => (label.includes("Time") ? checkBlank : checkBlankTime);
