import { compose } from 'recompose'

import Store from './Store'
import Fetch from './mixins/Fetch'
import Search from './mixins/Search'
import Sort from './mixins/Sort'

export default compose(
  Fetch,
  Search,
  Sort,
)(Store)