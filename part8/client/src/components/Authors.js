import React, { useState } from 'react';
import Select from 'react-select';

const Authors = ({ result, show, editAuthor }) => {
  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  if (!show) {
    return null;
  }

  const submit = async (e) => {
    e.preventDefault();
    console.log('born:', born);
    await editAuthor({ variables: { name: selectedOption.value, setBornTo: born.toString().length > 0 ? born : null } } );

    setSelectedOption(null);
    setBorn('');
  };

  if (result.loading)
    return <div>loading...</div>;
  else {
    const options = result.data.allAuthors.reduce((obj, currentAuthor) => obj.concat({ 'value': currentAuthor.name, 'label': currentAuthor.name }), []);

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
        {editAuthor &&
          <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
              <div>
                <Select
                  value={selectedOption}
                  onChange={(selected) => setSelectedOption(selected)}
                  options={options}
                />
              </div>
              <div>
                born
                <input
                  type='number'
                  value={born}
                  onChange={({ target }) => setBorn(Number(target.value))}
                />
              </div>
              <button type='submit'>update author</button>
            </form>
          </div>
        }
      </div>
    );
  }
};

export default Authors;