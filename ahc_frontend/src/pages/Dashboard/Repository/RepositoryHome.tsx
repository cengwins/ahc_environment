import { observer } from 'mobx-react';
import { useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useStores } from '../../../stores/MainStore';
import '../DashboardHome.css';
import mockReadMe from './mockReadMe';
import { github } from './svgs';

const RepositoryField = (title: string, value: string) => (
  <div>
    <span>{`${title}: `}</span>
    <span>{value}</span>
  </div>
);

const RepositoryHome = observer(() => {
  const { repositoryId } = useParams();
  const { dashboardNavigationStore, repositoriesStore } = useStores();
  const [loading, setLoading] = useState(false);
  const [failedToLoad, setFailed] = useState(false);

  if (repositoryId) dashboardNavigationStore.setRepositoryId(repositoryId);

  const { currentRepository: repository } = repositoriesStore;

  if (!loading
    && !failedToLoad
    // eslint-disable-next-line eqeqeq
    && (!repository || repository.id != repositoryId)) {
    setLoading(true);
    repositoriesStore.getRepository(repositoryId as string)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {loading && (
      <div className="d-flex">
        <Spinner className="mx-auto my-4" animation="border" />
      </div>
      )}
      {failedToLoad && (
        <div>
          Failed to load the repository. Please try again.
        </div>
      )}
      {repository && (
      <div>
        <h4>
          {repository.name}
          {' '}
          <span className="small" style={{ fontFamily: 'monospace', backgroundColor: '#ddd' }}>{repository.slug}</span>
        </h4>
        {RepositoryField('id', repository.id)}
        <div className="my-2">
          <a className="btn btn-outline-primary me-2" href={repository.upstream} target="_blank" rel="noreferrer">
            <span className="me-1">
              {github}
            </span>
            View on GitHub
          </a>
          <a className="btn btn-outline-primary" href={repository.upstream.replace('github.com', 'github.dev')} target="_blank" rel="noreferrer">
            <span className="me-1">
              {github}
            </span>
            Open in GitHub.dev
          </a>
        </div>
        <Card className="mt-4">
          <Card.Body>
            <ReactMarkdown>{mockReadMe}</ReactMarkdown>
          </Card.Body>
        </Card>
      </div>
      )}
    </div>
  );
});

export default RepositoryHome;
