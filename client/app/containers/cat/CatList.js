/**
 * Created by n0256343 on 3/21/2017.
 */
import React, {PropTypes} from 'react';
import CategoryListRow from './CatListRow';

const CatList = ({cats}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
        {cats.map(cat =>
          <CategoryListRow key={cat.id} cat={cat}/>
        )}
      </tbody>
    </table>
  );
};

export default CatList;
