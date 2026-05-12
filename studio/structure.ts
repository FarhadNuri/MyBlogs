import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Hero')
        .child(S.documentTypeList('hero').title('Hero')),
      S.listItem()
        .title('About')
        .child(S.documentTypeList('about').title('About')),
      S.divider(),
      S.listItem()
        .title('Topics')
        .child(S.documentTypeList('topic').title('Topics')),
      S.listItem()
        .title('Posts')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Posts by Topic')
        .child(
          S.documentTypeList('topic')
            .title('Posts by Topic')
            .child((topicId) =>
              S.documentList()
                .title('Posts')
                .filter('_type == "post" && topic._ref == $topicId')
                .params({topicId})
            )
        ),
    ])
