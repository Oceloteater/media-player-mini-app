import React from 'react';
import { Link } from 'react-router-dom';

const CourseListRow = ({cat}) => {
  return (
      <tr>
        <td>
          <img src={cat.imageUrl} alt="Cat" width="100" height="80"/>
        </td>
        {/*<td><Link to={'/catinfo/' + cat.id}>{cat.title}</Link></td>*/}
        <td><Link to={{
          pathname: '/catinfo/' + cat.id,
          state: { cat: cat }
        }}>{cat.title}</Link></td>
        <td>{cat.desc}</td>
      </tr>
  );
};

export default CourseListRow;

{/*<td><a href={course.watchHref} target="_blank">Watch</a></td>*/}

{/*<td><Link to={'/course/' + course.id}>{course.title}</Link></td>*/}

// courseRow(course, index) {
//   return <div key={index}>{course.title}</div>;
// }
