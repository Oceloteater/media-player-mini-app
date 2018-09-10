/**
 * Created by n0256343 on 3/21/2017.
 */
import React, {PropTypes} from 'react';
import CategoryListRow from './CategoryListRow';

const CategoryList = ({categories, cats}) => {
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
      {/*{categories.map(category =>*/}
        {/*<CategoryListRow key={category.title} category={category}/>*/}
      {/*)}*/}
      {cats.map(cat =>
        <CategoryListRow key={cat.id} cat={cat}/>
      )}
      </tbody>
    </table>
  );
};

export default CategoryList;
