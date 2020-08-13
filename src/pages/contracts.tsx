import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { CardContent, Card } from "@material-ui/core"

import Layout from "../components/layout"
import { graphql, useStaticQuery } from "gatsby"

const Blurb = styled.div`
  padding: 1rem;
`

const CompanyContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  width: 100%;
`

const CompanyImage = styled.div`
  // background-color: grey;
`

const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const Description = styled.div`
  margin-bottom: 0.25rem;
`

const Duration = styled.div`
  font-size: 1rem;
  font-weight: normal;
  padding-left: 0.25rem;
`

const Image = styled.div`
  width: 100%;
  @media (min-width: 600px) {
    max-width: 30%;
  }
`

const MB8 = styled.div`
  margin-bottom: 0.5rem;
`

const MB16SM0 = styled.div`
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    margin-bottom: 0;
  }
`

const MB24 = styled.div`
  margin-bottom: 1.5rem;
`

const Name = styled.div`
  align-items: baseline;
  display: flex;
  font-size: 1.2rem;
  font-weight: 800;
`

const Title = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`

const WorkDescription = styled.div``

const Wrapper = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 60rem;

  @media (min-width: 600px) {
    padding: 1rem;
  }
`

const WorkPage = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      companies: allWorkJson {
        nodes {
          companyDescription
          duration
          name
          workDescription
          src {
            childImageSharp {
              fluid(maxHeight: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const companies = data?.companies.nodes

  return (
    <Layout>
      <Wrapper>
        <Blurb>
          Here is a list of some of the projects that we have worked on.
        </Blurb>
        <MB24 />

        {companies.map(company => (
          <>
            <Card>
              <CardContent>
                <ContentWrapper>
                  <Image>
                    <CompanyImage>
                      {company.src && (
                        <Img fluid={company.src.childImageSharp.fluid} />
                      )}
                    </CompanyImage>
                  </Image>
                  <MB16SM0 />
                  <CompanyContent>
                    <Name>
                      {company.name}
                      <Duration>- {company.duration}</Duration>
                    </Name>
                    <MB8 />
                    <Description>
                      <Title>Description: </Title>
                      {company.companyDescription}
                    </Description>
                    <MB8 />
                    <WorkDescription>
                      <Title>Role: </Title>
                      {company.workDescription}
                    </WorkDescription>
                  </CompanyContent>
                </ContentWrapper>
              </CardContent>
            </Card>
            <MB24 />
          </>
        ))}
      </Wrapper>
    </Layout>
  )
}

export default WorkPage
