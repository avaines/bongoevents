import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Call from '../components/Call';

const WorkWithUs = props => {
  const wow = props.data.wow.edges;
  const { intro } = props.data;

  const introImageClasses = `intro-image ${intro.frontmatter.intro_image_absolute && 'intro-image-absolute'} ${intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'}`;

  return (
    <Layout bodyClass="page-wow">
      <SEO title="Work with Us" />


      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-8 col-lg-10 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
            {/* {intro.frontmatter.intro_image && (
              <div className="col-12 col-md-5 col-lg-6 order-1 order-md-2 position-relative">
                <img alt={intro.frontmatter.title} className={introImageClasses} src={intro.frontmatter.intro_image} />
              </div>
            )} */}
          </div>
        </div>
      </div>

      <div className="container pb-6">
        <div className="row">
          {wow.map(edge => (
            <div key={edge.node.id} className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
              <div className="card wow wow-teaser">
                <h2>{edge.node.frontmatter.title}</h2>
                <img alt={edge.node.frontmatter.title} src={edge.node.frontmatter.image} width="100%"/>
                <div className="card-content">
                  <br></br>
                  <div className="content" dangerouslySetInnerHTML={{ __html: edge.node.html }} />
                  <br></br>
                  <div>
                    <a href={edge.node.frontmatter.link} className="button">Get Involved</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query WowQuery {
    wow: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/work-with-us\/.*/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            image
            link
          }
          html
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: {regex: "/(work-with-us.md)/"}) {
      html
      frontmatter {
        image
        intro_image
        intro_image_absolute
        intro_image_hide_on_mobile
        title
      }
    }
  }
`;

export default WorkWithUs;
