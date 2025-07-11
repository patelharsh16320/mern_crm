const express = require('express');
const { Home } = require('../controllers/auth');
const { getAllRecords, userCreate, Login, deleteUser, updateUser, updateShowUser, uploadFile, logLogin, deleteAllUsers, getShowJobUsers } = require('../controllers/modelController');
const { processPlaylist } = require('../controllers/playlistDownload');
const { createComapny, deleteCompany, updateCompany, deleteCompanyProfile, createCompanyProfile, updateCompanyProfile, deleteJobProfile, createJobPosition, updateJobPosition, deleteAllJobsPositions, deleteAllCompanys, deleteAllJobsprofiles, createNewJob, deleteCreateJob, deleteAllCreateJob, updateNewJob } = require('../controllers/companyController')
const router = express.Router();
const { CreateApplyForJob, deleteApplyForJob,deleteAllApplyForJob } = require('../controllers/userController');

// Get API 
router.route('/').get(Home);
router.route('/update-show-users').get(updateShowUser);
router.get('/show-:table', getAllRecords);
router.get('/all-jobs-display', getShowJobUsers);

// Post API
router.route('/create-users').post(userCreate);
router.route('/login').post(Login);

router.route('/log-login').post(logLogin);
router.route('/update-user').post(updateUser);
router.route('/upload-file').post(uploadFile);
router.route('/playlist-download').post(processPlaylist);
router.route('/create-company').post(createComapny);
router.route('/update-company').post(updateCompany);
router.route('/create-company-profile').post(createCompanyProfile);
router.route('/update-company-profile').post(updateCompanyProfile);
router.route('/create-job-position').post(createJobPosition);
router.route('/update-job-position').post(updateJobPosition);
router.route('/create-new-job').post(createNewJob);
router.route('/update-new-job').post(updateNewJob);

router.route('/create-apply-for-job').post(CreateApplyForJob);

// Delete API
router.route('/delete/:id').delete(deleteUser);
router.route('/delete-company/:id').delete(deleteCompany);
router.route('/delete-all-users').delete(deleteAllUsers);
router.route('/delete-company-profile/:id').delete(deleteCompanyProfile);
router.route('/delete-job-profile/:id').delete(deleteJobProfile);
router.route('/delete-all-companys').delete(deleteAllCompanys);
router.route('/delete-all-jobs').delete(deleteAllJobsPositions);
router.route('/delete-all-profiles').delete(deleteAllJobsprofiles);
router.route('/delete-create-job-profile/:id').delete(deleteCreateJob);
router.route('/delete-all-jobs-create').delete(deleteAllCreateJob);
router.route('/delete-apply-for-job/:id').delete(deleteApplyForJob);
router.route('/delete-all-apply-for-job').delete(deleteAllApplyForJob);

module.exports = router;