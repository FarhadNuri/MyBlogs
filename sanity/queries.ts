export const HERO_QUERY = `*[_type == 'hero'][0]{
  _id,
  title,
  text
}`;

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...6]{
  _id,
  title,
  slug,
  publishedAt
}`;

export const HOME_POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt
}`;

export const POST_QUERY = `*[_type == 'post' && slug.current == $slug][0]`;

export const TOPICS_QUERY = `*[_type == "topic" && defined(slug.current)]|order(title asc){
  _id,
  title,
  slug,
  description
}`;

export const TOPIC_QUERY = `*[_type == "topic" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description
}`;

export const POSTS_BY_TOPIC_QUERY = `*[_type == "post" && defined(slug.current) && topic->slug.current == $slug]|order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt
}`;

export const ABOUT_QUERY = `*[_type == 'about'][0]{
  _id,
  title,
  body
}`;