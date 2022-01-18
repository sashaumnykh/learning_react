import React, { Component } from 'react';

export class PageButton extends Component {
    render() {
        const pageNumber = this.props.pageNumber;
        return(
            <button className='page-button' value={pageNumber} onClick={this.props.onClick}>
                {pageNumber}
            </button>
        );
    }
}