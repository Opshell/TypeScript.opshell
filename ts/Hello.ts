enum HTTP_VERBS {
   GET = 'GET',
   POST = 'POST',
   PUT = 'PUT',
   DELETE = 'DELETE',
   PATCH = 'PATCH',
}
type tHttpVerbs = keyof typeof HTTP_VERBS;