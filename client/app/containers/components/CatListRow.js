import React from 'react';
import { Link } from 'react-router-dom';

const CourseListRow = ({cat}) => {
  return (
      <tr>
        <td>
          <Link to={{
            pathname: '/catinfo/' + cat.id,
            state: { cat: cat }
          }}><img src={cat.imageUrl} alt="Cat" width="100" height="80"/></Link>
        </td>
        <td>
          <Link to={{
            pathname: '/catinfo/' + cat.id,
            state: { cat: cat }
        }}>{cat.title}</Link>
        </td>
        <td>{cat.desc}</td>
      </tr>
  );
};

export default CourseListRow;
