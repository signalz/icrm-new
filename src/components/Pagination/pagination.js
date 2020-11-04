import ReactPaginate from "react-paginate";
import React from "react";
import { injectIntl } from 'react-intl';

const Pagination = ({ intl, ...props }) => {
  const {formatMessage} = intl;
  const lastPage = 1;
  const totalPage = 0;
  console.log(props.data, "=============")
  return (
    props.data && (props.data.last_page === lastPage || props.data.total === totalPage) ? null :
    <ReactPaginate
      previousLabel={formatMessage({ id: 'indexUserPage.paginate.back' })}
      nextLabel={formatMessage({ id: 'indexUserPage.paginate.next' })}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={props.data.last_page ? props.data.last_page : 0}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      onPageChange={props.onPageChange}
      forcePage={props.forcePage ? props.forcePage : 0}
      initialPage={props.initialPage}
      disableInitialCallback
    />
  );
};

export default injectIntl(Pagination);
