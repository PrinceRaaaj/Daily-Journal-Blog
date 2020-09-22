exports.getDate = ()=>{
  let today = new Date();
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return  today.toLocaleDateString("en-US", options);
}
