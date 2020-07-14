import React, { useContext } from 'react';
import { Box, Button, Heading, Paragraph, ResponsiveContext } from 'grommet';

const About = () => {
  const size = useContext(ResponsiveContext);
  return (
    <>
      {size !== 'small' ? (
        <div className="about_div">
          <Box direction="column" margin="auto" width="40rem">
            <Heading textAlign="center" level={4} color={'background-front'}>
              Site Created By Zachary Rizer
            </Heading>
            <Box direction="row" justify="center">
              <a href="https://github.com/ZacharyRizer">
                <Button
                  primary={true}
                  color={'background'}
                  label="GitHub"
                  margin="small"
                />
              </a>
              <a href="https://www.linkedin.com/in/zachary-rizer/">
                <Button
                  primary={true}
                  color={'background'}
                  label="LinkedIn"
                  margin="small"
                />
              </a>
              <a href="http://zacharyrizer.com/">
                <Button
                  primary={true}
                  color={'background'}
                  label="Portfolio"
                  margin="small"
                />
              </a>
            </Box>
            <Heading textAlign="center" level={4} color={'background-front'}>
              Trip Calculations
            </Heading>
            <Paragraph textAlign="center" color={'background-front'} fill>
              Currently the travel times and distance calculations are
              rudimentary at best. The cartesian coodinates and velocities of
              the departure and arrival locations are collected for a specific
              departure date. These coordinates are from the reference plane of
              the solar system's barycenter (center of mass). Then a simple
              distance between two points caluculation is made. And then finally
              using an average crusing speed of 25,000 km per hour the travel
              time is aquired.
            </Paragraph>
            <Paragraph textAlign="center" color={'background-front'} fill>
              Obviously this is very inaccurate and naive physics. With the time
              frame available while creating this application, the functionality
              of the app took precedence over the physics. I do hope to dive in
              deeper when the time presents itself and make more accurate
              approximations utilizing orbital mechanics and calculating a
              hohmann transfer or implementing Lambert's problem.
            </Paragraph>
          </Box>
        </div>
      ) : (
        <Box direction="column" align="center" margin="small">
          <Heading textAlign="center" level={4} margin="medium">
            Created By Zachary Rizer
          </Heading>
          <div>
            <a href="https://github.com/ZacharyRizer">
              <Button color="brand" label="Github" margin="5px" />
            </a>
            <a href="https://www.linkedin.com/in/zachary-rizer/">
              <Button color="brand" label="LinkedIn" margin="5px" />
            </a>
            <a href="http://zacharyrizer.com/">
              <Button color="brand" label="Portfolio" margin="5px" />
            </a>
          </div>
          <Heading
            textAlign="center"
            level={4}
            margin={{ top: 'medium', bottom: 'xsmall' }}>
            Trip Calculations
          </Heading>
          <Paragraph textAlign="center">
            Currently the travel times and distance calculations are rudimentary
            at best. The cartesian coodinates and velocities of the departure
            and arrival locations are collected for a specific departure date.
            These coordinates are from the reference plane of the solar system's
            barycenter (center of mass). Then a simple distance between two
            points caluculation is made. And then finally using an average
            crusing speed of 25,000 km per hour the travel time is aquired.
          </Paragraph>
          <Paragraph textAlign="center">
            Obviously this is very inaccurate and naive physics. With the time
            frame available while creating this application, the functionality
            of the app took precedence over the physics. I do hope to dive in
            deeper when the time presents itself and make more accurate
            approximations utilizing orbital mechanics and calculating a hohmann
            transfer or implementing Lambert's problem.
          </Paragraph>
        </Box>
      )}
    </>
  );
};

export default About;
