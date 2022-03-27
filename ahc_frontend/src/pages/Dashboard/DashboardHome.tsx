import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { observer } from 'mobx-react';
import { useState } from 'react';
import Loading from '../../components/Loading';
import { useStores } from '../../stores/MainStore';
import './DashboardHome.css';
import RepositoriesList from './RepositoriesList';

const DashboardHome = observer(() => {
  const { githubStore, repositoriesStore, notificationStore } = useStores();
  const [searchString, setSearchString] = useState('');
  const [show, setShow] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [chosens, setChosens] = useState<string[]>([]);

  const handleStringSearch = (e: any) => {
    const currentSearchString = e.target.value;
    setSearchString(currentSearchString);
    if (currentSearchString.length >= 3
      && githubStore.currentSearchString !== currentSearchString) {
      setSearching(true);
      setSearchFailed(false);
      githubStore.getGithubRepos(currentSearchString)
        .catch(() => {
          if (currentSearchString === e.target.value) {
            setSearchFailed(true);
          }
        }).finally(() => {
          if (currentSearchString === e.target.value) {
            setSearching(false);
          }
        });
    }
    repositoriesStore.getRepositories();
  };

  return (
    <>
      <Dialog fullWidth open={show} onClose={() => setShow(false)}>
        <DialogTitle>
          Add a repository from GitHub.
        </DialogTitle>

        <DialogContent>
          <form>
            <FormGroup sx={{ mb: 2, pt: 1 }}>
              <TextField type="text" label="Repository Name" placeholder="Repository Name" onChange={handleStringSearch} />
            </FormGroup>
          </form>

          {searchString && searchString.length < 3 && (
          <Typography fontSize="small">
            Please enter at least 3 characters to start searching.
          </Typography>
          )}
          <Box sx={{ width: '100%' }}>
            <Loading loading={searching} failed={searchFailed} />
          </Box>
          {!searching && !searchFailed
          && (
          <div>
            {searchString && searchString.length >= 3 && githubStore.userRepos.length === 0 && (
              <Typography>
                There are no repositories with the given name.
              </Typography>
            )}
            <List sx={{ mt: 3 }}>
              {githubStore.userRepos.map((repository) => (
                <ListItem
                  key={repository.id}
                  className="repository-item"
                >
                  <div style={{ display: 'block', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Link underline="hover" href={repository.html_url} target="_blank" rel="noreferrer">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h5" sx={{ color: 'secondary' }}>{repository.name}</Typography>
                          <Typography variant="subtitle1" sx={{ fontSize: 'small' }}>
                            {repository.html_url}
                          </Typography>
                        </div>
                      </Link>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          repositoriesStore.createRepository(
                            { name: repository.name, upstream: repository.html_url },
                          )
                            .then(() => notificationStore.set('success', 'Repository is successfully added.'))
                            .catch(() => notificationStore.set('error', 'Failed to add the repository.'));
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
          )}
        </DialogContent>
      </Dialog>

      <div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component="h1" variant="h3" sx={{ color: `${blue[700]}` }}>
            Your Repositories
          </Typography>
          <Button
            color="error"
            variant="contained"
            sx={{ ml: 'auto' }}
            disabled={isDeleting}
            onClick={() => {
              if (chosens.length === 0) {
                notificationStore.set('info', 'Please choose repositories to delete.');
                return;
              }
              setIsDeleting(true);
              repositoriesStore.deleteRepositories(chosens)
                .then((removedIds) => {
                  if (chosens.length === removedIds.length) {
                    notificationStore.set('success', `${chosens.length} repositories are deleted.`);
                  } else {
                    notificationStore.set('info', `Only ${removedIds.length} out of ${chosens.length} repositories are deleted.`);
                  }
                  setChosens(chosens.filter((chosenId) => !removedIds.includes(chosenId)));
                }).catch((result) => {
                  notificationStore.set('error', result.message);
                }).finally(() => {
                  setIsDeleting(false);
                });
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={() => setShow(true)}
          >
            Add Repository
          </Button>
        </Box>

        <RepositoriesList chosens={chosens} setChosens={setChosens} />
      </div>
    </>
  );
});

export default DashboardHome;
