import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import ApplicantTable from '../../sections/@dashboard/applicant/ApplicantTable';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function Applicant() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Applicant">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Applicant List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Applicant' },
          ]}
        />

        <ApplicantTable />
      </Container>
    </Page>
  );
}
