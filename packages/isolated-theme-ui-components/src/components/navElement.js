/** @jsx jsx */
import { jsx } from "../context";
import { Fragment } from "react";

import Flex from "../components/flex";
import Box from "../components/box";
import Breadcrumbs from "../components/breadcrumbs";

export default ({ children, crumbs }) => (
  <Fragment>
    <Flex>
      <Box>
        <Breadcrumbs crumbs={crumbs} />
      </Box>
    </Flex>
    {children}
  </Fragment>
);
