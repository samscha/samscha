import React from 'react';
import { useQuery } from 'react-query';

import './Home.scss';

export default ({
  IconsBy,
  Loading,
  LocationMarker,
  Project,
  TechIcon,
  projects,
}) => {
  const HomePage = () => {
    const apiBaseUri = process.env.REACT_APP_API_BASE_URL;

    const fetchLocation = async () => {
      const response = await fetch(`${apiBaseUri}/v1/location`);
      if (response.status !== 200) {
        throw new Error(JSON.stringify(response));
      }

      return response.json();
    };
    const fetchSkills = async () => {
      const response = await fetch(`${apiBaseUri}/v1/skills`);
      if (response.status !== 200) {
        throw new Error(JSON.stringify(response));
      }

      return response.json();
    };

    const locationQuery = useQuery('location', fetchLocation);
    const skillsQuery = useQuery('skills', fetchSkills);

    const filteredProjects = projects.filter((p) => p.enabled);
    const showProjects = JSON.parse(
      process.env.REACT_APP_SHOW_PROJECTS || 'false'
    );

    return (
      <div className="homepage">
        {!skillsQuery.isLoading && !locationQuery.isLoading ? (
          <React.Fragment>
            <LocationMarker location={locationQuery.data.location} />

            {skillsQuery.data.primarySkills.length === 0 &&
              skills.secondarySkills.length === 0 && (
                <div className="technology-container">
                  <div className="technology-bar">
                    <div key="no-skills-key" className="technology-bar__icon">
                      <TechIcon
                        {...{
                          icon: [`far`, `file`],
                          link: `#`,
                          text: `No Skills`,
                          title: 'No technical skills to show',
                          type: 'fa',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

            {skillsQuery.data.primarySkills.length > 0 && (
              <div className="technology-container">
                <div className="technology-bar">
                  {skillsQuery.data.primarySkills.map((tech) => (
                    <div key={tech.link} className="technology-bar__icon">
                      <TechIcon
                        {...tech}
                        size="xs"
                        className={tech.text.length > 10 ? 'xl' : ''}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skillsQuery.data.secondarySkills.length > 0 && (
              <div className="technology-container">
                <div className="technology-bar secondary">
                  {skillsQuery.data.secondarySkills.map((tech) => (
                    <div key={tech.link} className="technology-bar__icon">
                      <TechIcon {...tech} text="" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showProjects ? (
              <div className="projects">
                <div className="title">Projects</div>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div key={project.name} className="project-container">
                      <Project {...project} />
                    </div>
                  ))
                ) : (
                  <div className="no-projects-title">No Projects To Show</div>
                )}
              </div>
            ) : null}

            <IconsBy fa fz />
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </div>
    );
  };

  return HomePage;
};

const backupTechs = () => {
  const techs = [
    {
      text: `AWS`,
      title: 'Click to learn more about AWS',
      link: `https://aws.amazon.com/`,
      icon: [`fab`, `aws`],
      type: 'fa',
      set: `secondary`,
      enabled: true,
    },
    {
      text: `CSS3`,
      title: `Click to learn more about CSS from MDN`,
      link: `https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3`,
      icon: [`fab`, `css3-alt`],
      type: `fa`,
      set: `primary`,
      enabled: false,
    },
    {
      text: `cli`,
      title: `Click to learn more about macOS Terminal`,
      link: `https://support.apple.com/guide/terminal/welcome/mac`,
      icon: `icon-shell`,
      type: `fz`,
      set: `primary`,
      enabled: true,
    },
    {
      text: `Fastify`,
      title: `Click to learn more about Fastify`,
      link: `https://www.fastify.io`,
      icon: [`fas`, `server`],
      type: `fa`,
      set: `primary`,
      enabled: false,
    },
    {
      text: `Docker`,
      title: `Click to learn more about Docker`,
      link: `https://www.docker.com`,
      icon: [`fab`, `docker`],
      type: `fa`,
      set: `primary`,
      enabled: true,
    },
    {
      text: `Express`,
      title: `Click to learn more about ExpressJS, a Node.js backend framework`,
      link: `https://expressjs.com/`,
      icon: [`fas`, `server`],
      type: `fa`,
      set: `primary`,
      enabled: true,
    },
    {
      text: `Git`,
      title: `Click to go to Sam's GitHub`,
      link: `https://github.com/samscha`,
      icon: `icon-git`,
      type: `fz`,
      set: `primary`,
      enabled: true,
    },
    {
      text: `HTML5`,
      title: `Click to learn more about HTML5 from MDN`,
      link: `https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5`,
      icon: [`fab`, `html5`],
      type: `fa`,
      set: `primary`,
      enabled: false,
    },
    {
      text: `JavaScript`,
      title: `Click to learn more about JavaScript from MDN`,
      link: `https://developer.mozilla.org/en-US/docs/Web/JavaScript`,
      icon: [`fab`, `js-square`],
      type: `fa`,
      set: `primary`,
      enabled: true,
    },
    {
      text: `Sass`,
      title: `Click to learn more about Sass, a CSS preprocessor`,
      link: `https://sass-lang.com/`,
      icon: [`fab`, `sass`],
      type: `fa`,
      set: `secondary`,
      enabled: false,
    },
    {
      text: `macOS`,
      title: `Click to learn more about macOS`,
      link: `https://en.wikipedia.org/wiki/MacOS`,
      icon: [`fab`, `apple`],
      type: `fa`,
      set: `primary`,
      enabled: true,
    },
    {
      text: `PHP`,
      title: `Click to learn more about PHP`,
      link: `https://www.php.net/`,
      icon: ['fab', 'php'],
      type: `fa`,
      set: `secondary`,
      enabled: false,
    },
    {
      text: `MySQL`,
      title: `Click to learn more about MySQL`,
      link: `https://www.mysql.com`,
      icon: `icon-mysql-alt`,
      type: `fz`,
      set: `secondary`,
      enabled: false,
    },
    {
      text: `Node.js`,
      title: `Click to learn more about Node.js`,
      link: `https://nodejs.org/en/`,
      icon: [`fab`, `node-js`],
      type: `fa`,
      set: `primary`,
      enabled: true,
    },
    {
      text: `npm`,
      title: `Click to learn more about npm`,
      link: `https://www.npmjs.com`,
      icon: [`fab`, `npm`],
      type: `fa`,
      set: `primary`,
      enabled: true,
    },
    {
      text: `React`,
      title: `Click to learn more about React`,
      link: `https://reactjs.org`,
      icon: [`fab`, `react`],
      type: `fa`,
      set: `primary`,
      enabled: true,
    },
    {
      text: `Gitflow`,
      title: `Click to learn more about Gitflow`,
      link: `https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow`,
      icon: [`fas`, `code-branch`],
      type: `fa`,
      set: `primary`,
      enabled: false,
    },
    {
      text: 'Agile',
      title: 'Click to learn more about Agile workflow',
      link: 'https://www.atlassian.com/agile/project-management/workflow',
      icon: ['fab', 'jira'],
      type: 'fa',
      set: `primary`,
      enabled: true,
    },
    {
      text: 'PostgreSQL',
      title: 'Click to learn more about PostgreSQL',
      link: 'https://www.postgresql.org/',
      icon: `icon-postgres`,
      type: `fz`,
      set: `primary`,
      enabled: true,
    },
    {
      text: 'TypeScript',
      title: 'Click to learn more about TypeScript',
      link: 'https://www.typescriptlang.org',
      icon: ['fas', 'code'],
      type: `fa`,
      set: `primary`,
      enabled: true,
    },
    {
      text: 'GCP',
      title: 'Click to learn more about Google Cloud Platform',
      link: 'https://cloud.google.com',
      icon: ['fab', 'google'],
      type: `fa`,
      set: `primary`,
      enabled: true,
    },
  ];
  const primaryTechs = techs
    .filter((t) => t.set === 'primary' && t.enabled)
    .sort((a, b) => {
      a = a.text.toUpperCase();
      b = b.text.toUpperCase();

      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  const secondaryTechs = techs
    .filter((t) => t.set === 'secondary' && t.enabled)
    .sort((a, b) => {
      a = a.text.toUpperCase();
      b = b.text.toUpperCase();

      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

  return {
    primarySkills: primaryTechs,
    secondarySkills: secondaryTechs,
  };
};

const backupLocation = () => {
  return 'Austin, TX';
};
