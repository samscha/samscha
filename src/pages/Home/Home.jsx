import React from 'react';
import techs from '../../assets/js/home/techs';
import { IconsBy, Link, LocationMarker, TechIcon } from '../../components';
import './Home.scss';

export default class extends React.Component {
  render() {
    return (
      <div className="homepage">
        <Link to="/about" title="Go to the about page">
          <LocationMarker />
        </Link>

        {techs.length > 0 && (
          <div className="technology-container">
            <div className="technology-bar">
              {techs
                .sort((a, b) => {
                  a = a.text.toUpperCase();
                  b = b.text.toUpperCase();

                  if (a < b) return -1;
                  if (a > b) return 1;
                  return 0;
                })
                .map(tech => (
                  <div key={tech.link} className="technology-bar__icon">
                    <TechIcon {...tech} />
                  </div>
                ))}
            </div>
          </div>
        )}

        <IconsBy fa fz />

        {/* {projects.length > 0 && (
            <div className="projects">
              Projects
              {projects.map(project => (
                <div key={project.id} className="projects__project">
                  <Project {...project} />
                </div>
              ))}
            </div>
          )} */}
      </div>
    );
  }
}
