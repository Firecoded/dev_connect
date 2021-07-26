import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getGithubRepos, repos, theme }) => {
    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos, username]);

    return (
        <div className={`profile-github px-3 ${theme.background2} `}>
            <h3 className={`${theme.brandText2}`}>Github Repos</h3>
            {repos.map((repo) => (
                <div key={repo.id} className={`${theme.background3} repo p-3 my-2 z-depth-4`}>
                    <div>
                        <h5 className="mt-2">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                <span className={`${theme.brandText1}`}>{repo.name}</span>
                            </a>
                        </h5>
                        <p>{repo.description}</p>
                    </div>
                    <div>
                        <ul>
                            <li className={`badge px-2 ${theme.background2}`}>Stars: {repo.stargazers_count}</li>
                            <li className={`badge px-2 ${theme.background2}`}>Watchers: {repo.watchers_count}</li>
                            <li className={`badge px-2 ${theme.background2}`}>Forks: {repo.forks_count}</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    repos: state.profile.repos,
    theme: state.theme,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
