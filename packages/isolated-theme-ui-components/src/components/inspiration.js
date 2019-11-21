/** @jsx jsx */
import { jsx } from "../context";

export default ({ from }) => (
  <div>
    <hr />
    {from ? (
      <a
        href={from}
        sx={{ variant: "styles.a" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Inspired by {from}
      </a>
    ) : null}
  </div>
);
