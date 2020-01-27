/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import Img from "gatsby-image";

export default ({ featuredImage }) => {
  if (featuredImage) {
    return (
      <Box sx={{ width: "100%", padding: 0, margin: 0 }}>
        <Img
          sx={{
            maxHeight: "600px",
            variant: "jboldaGatsbyTheme.articles.article.featuredImage"
          }}
          fluid={featuredImage.fluid}
        />
      </Box>
    );
  } else {
    return null;
  }
};
