import React, { useState } from 'react';


const Authors = ({ result, show, editAuthor }) => {
  const [name, setName] = useState('');
  const [setBornTo, setSetBornTo] = useState('');

  if (!show) {
    return null;
  }

  const submit = async (e) => {
    e.preventDefault();

    await editAuthor({ variables: { name, setBornTo } } );

    setName('');
    setSetBornTo('');
  };

  if (result.loading)
    return <div>loading...</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  );
};

export default Authors;