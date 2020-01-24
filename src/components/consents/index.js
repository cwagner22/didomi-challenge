import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getConsents } from '../../modules/consent'

const useStyles = makeStyles(theme => ({}))

const Consents = props => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value })
  // }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    props.getConsents()
  }, [])

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell style={{ minWidth: '70%' }}>
                Consent given for
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.consents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(consent => (
                <TableRow key={consent.email}>
                  <TableCell>{consent.name}</TableCell>
                  <TableCell>{consent.email}</TableCell>
                  <TableCell>{consent.consents}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 10, 25]}
                // component="div"
                count={props.consents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

const mapStateToProps = ({ consent }) => ({
  consents: consent.consents
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getConsents
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Consents)
