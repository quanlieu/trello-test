import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { getAllRepos } from '../apis/repos';
import { IRepo } from '../types/repo';

function Home() {
  const [repos, setRepos] = useState<Array<IRepo>>([]);
  useEffect(() => {
    async function getApi() {
      const response = await getAllRepos();
      if (response.data.repos.length) {
        setRepos(response.data.repos);
      }
    }
    getApi();
  }, []);

  return (
    <div>
      {repos.map(v => <div key={v.id}>Name: {v.name}</div>)}
    </div>
  );
}

export default Home;
