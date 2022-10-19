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
import CategoryTable from '../../sections/@dashboard/category/CategoryTable';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function Category() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Category">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Category List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Category' },
          ]}
          action={
            <Button
              variant="contained"
              starIcon={<Iconify icon={'eva:plus-fill'} />}
              to={PATH_DASHBOARD.general.categoryadd}
              component={RouterLink}
            >
            Add Category 
            </Button>
        }
        />

        <CategoryTable />
      </Container>
    </Page>
  );
}
