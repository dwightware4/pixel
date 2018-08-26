// constants/index.js


const days = {
  'Sun':'Sunday',
  'Mon':'Monday',
  'Tue':'Tuesday',
  'Wed':'Wednesday',
  'Thu':'Thursday',
  'Fri':'Friday',
  'Sat':'Saturday',
}

const months = {
  'Jan': 'January',
  'Feb': 'February',
  'Mar': 'March',
  'Apr': 'April',
  'May': 'May',
  'Jun': 'June',
  'Jul': 'July',
  'Aug': 'August',
  'Sep': 'September',
  'Oct': 'October',
  'Nov': 'November',
  'Dec': 'December'
}

export const baseURL = 'https://pixelandtexel-blog.ghost.io';

export const prettyDate = dateString => {

  dateString = JSON.stringify(dateString);
  dateArray = new Date(JSON.parse(dateString)).toDateString().split(' ');
  // Output: Day-Name Month Day-Number, Year
  return dateArray.map( (item, index) => {

    if(days.hasOwnProperty(item)) return days[ item ] + ' ';

    if(months.hasOwnProperty(item)) return months[ item ] + ' ';

    if(item[0] === '0') return item.replace('0', '') + ', ';

    if(index === 2) return item + ', ';

    return item + ' ';
  });
}

export const getNextIndex = (list, currentIndex) => {
  // go back to start if at end of list
  return currentIndex + 1 === list.length
    ? 0
    : currentIndex + 1
}

// get slug for querying article data from next article in list
export const getSlugFromIndex = (articlesList, nextIndex) => {

  if(articlesList === undefined || articlesList.length === 0)
    return;

  if(nextIndex >= articlesList.length)
    return articlesList[ 0 ].slug;

  return articlesList[ nextIndex ].slug;
}
