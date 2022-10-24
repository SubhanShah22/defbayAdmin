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
import RecruiterTable from '../../sections/@dashboard/recruiter/RecruiterTable';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function Recruiter() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Recruiter">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Recruiter List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Recruiter' },
          ]}
        />

        <RecruiterTable />
      </Container>
    </Page>
  );
}
