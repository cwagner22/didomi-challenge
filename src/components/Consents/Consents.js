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
import { useDispatch, useSelector } from 'react-redux'

import { getConsents } from '../../modules/consent'
import { consents } from '../../modules/data'

const useStyles = makeStyles(theme => ({}))

const Consents = () => {
  const classes = useStyles()
  const userConsents = useSelector(state => state.consent.userConsents)
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    // Get all user consents from API
    dispatch(getConsents())
  }, [dispatch])

  const getConsentDescription = consentId =>
    consents.find(c => c.id === consentId).description

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
            {userConsents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(consent => (
                <TableRow key={consent.email}>
                  <TableCell>{consent.name}</TableCell>
                  <TableCell>{consent.email}</TableCell>
                  <TableCell>
                    {consent.consents
                      .map(consentId => getConsentDescription(consentId))
                      .join(', ')}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 10, 25]}
                count={userConsents.length}
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

export default Consents
