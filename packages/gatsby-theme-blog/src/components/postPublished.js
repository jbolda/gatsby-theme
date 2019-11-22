import React from "react";
import PropTypes from "prop-types";

class PostPublished extends React.Component {
  render() {
    const { frontmatter } = this.props;

    let published = frontmatter.updatedPretty ? (
      <div className="date-published has-text-grey-dark">
        <em>
          {`originally published ${frontmatter.writtenPretty}
              and updated ${frontmatter.updatedPretty}`}
        </em>
      </div>
    ) : (
      <div className="date-published has-text-grey-dark">
        <em>{`published ${frontmatter.writtenPretty}`}</em>
      </div>
    );

    return <div className="container content">{published}</div>;
  }
}

export default PostPublished;

PostPublished.propTypes = {
  frontmatter: PropTypes.shape({
    writtenPretty: PropTypes.string.isRequired,
    updatedPretty: PropTypes.string
  }).isRequired
};
