import React, {PropTypes} from 'react';
import ResizeImage from 'react-resize-image';

const CourseListRow = ({category}) => {
  return (
    <tr>
      <td>
        <img src={category.imageUrl} alt="Image" width="100" height="80"/>
      </td>
      <td>{category.title}</td>
      <td>{category.desc}</td>
    </tr>
  );
};

export default CourseListRow;


{/*<td><a href={course.watchHref} target="_blank">Watch</a></td>*/}

{/*<td><Link to={'/course/' + course.id}>{course.title}</Link></td>*/}

// courseRow(course, index) {
//   return <div key={index}>{course.title}</div>;
// }
