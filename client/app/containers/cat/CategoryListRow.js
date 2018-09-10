import React, {PropTypes} from 'react';

const CourseListRow = ({cat}) => {
  return (
      <tr>
        <td>
          <img src={cat.imageUrl} alt="Cat" width="100" height="80"/>
        </td>
        <td>{cat.title}</td>
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
