import { Route } from "react-router";

import CollectionsOverview from "../collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collection/collection.component";

const ShopPage = ({ match }) => (
  <div>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
