import React, { useContext } from 'react';
import { Box, Heading, Paragraph, ResponsiveContext } from 'grommet';

const About = () => {
  const size = useContext(ResponsiveContext);
  return (
    <>
      {size !== 'small' ? (
        <div className="about_div">
          <Box direction="column" margin="auto" width="50rem">
            <Heading textAlign="center" level={3} color={'background-front'}>
              Trip Calculations
            </Heading>
            <Paragraph textAlign="center" color={'background-front'} fill>
              Here at Air Kepler we want to make sure you can plan your voyage
              to a T! We strive to give you accurate approxomations of your
              travel times and distances. We start with the barycentric (center
              of mass of the solar system) cartesian coordinates and velocities
              of your departure and arrival locations on a particular date.
              These cartesian velocities are then converted to polar versions,
              and circular orbital kinematics are calculated for the destination
              planet.
            </Paragraph>
            <Paragraph textAlign="center" color={'background-front'} fill>
              The departure planet's coordinates are used as the launch location
              and simple circular orbital kinematic is calculated for the
              vessel. The time is calculated by setting the vessel and
              destination plents final location to be the same, and we solve for
              the total distance the vessel travels. The speed of the vessel
              (25,000 km/h for Economy, 50,000 km/h for premium) is then used to
              calculate the total time.
            </Paragraph>
            <Paragraph textAlign="center" color={'background-front'} fill>
              These estimations are VERY approximate, and by no means full
              proof. They are just a fun way to give you some ballpark estimates
              of your trek.
            </Paragraph>
          </Box>
        </div>
      ) : (
        <Box direction="column" align="center" margin="medium">
          <Heading textAlign="center" level={3} margin="none">
            Trip Calculations
          </Heading>
          <Paragraph textAlign="center">
            Here at Air Kepler we want to make sure you can plan your voyage to
            a T! We strive to give you highly accurate approxomations of your
            travel times and distances. We start with the barycentric (center of
            mass of the solar system) cartesian coordinates and velocities of
            your departure and arrival locations on a particular date. These
            cartesian velocities are then converted to polar versions, and
            circular orbital kinematics are calculated for the destination
            planet.
          </Paragraph>
          <Paragraph textAlign="center">
            The departure planet's coordinates are used as the launch location
            and simple circular orbital kinematic is calculated for the vessel.
            The time is calculated by setting the vessel and destination plents
            final location to be the same, and we solve for the total distance
            the vessel travels. The speed of the vessel (25,000 km/h for
            Economy, 50,000 km/h for premium) is then used to calculate the
            total time.
          </Paragraph>
          <Paragraph textAlign="center">
            These estimations are VERY approximate, and by no means full proof.
            They are just a fun way to give you some ballpark estimates of your
            trek.
          </Paragraph>
        </Box>
      )}
    </>
  );
};

export default About;
