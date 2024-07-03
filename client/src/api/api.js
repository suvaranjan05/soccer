import axios from 'axios'
export const baseUrl = "http://localhost:3000/api";


const getHeader = (token) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export async function getUserHeader(token) {

    const response = await axios.get(`${baseUrl}/user/get-header-data`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getPlayerProfile(token) {

    const response = await axios.get(`${baseUrl}/player/profile`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getManagerProfile(token) {

    const response = await axios.get(`${baseUrl}/manager/profile`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getRefereeProfile(token) {

    const response = await axios.get(`${baseUrl}/referee/profile`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getUserProfile(token) {

    const response = await axios.get(`${baseUrl}/user/profile`, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateUserProfile(token, data) {

    const response = await axios.put(`${baseUrl}/user/profile-update`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function updatePlayerBasicInfo(token, data) {

    const response = await axios.put(`${baseUrl}/player/basic-info-update`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateManagerBasicInfo(token, data) {

    const response = await axios.put(`${baseUrl}/manager/basic-info-update`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateRefereeBasicInfo(token, data) {

    const response = await axios.put(`${baseUrl}/referee/basic-info-update`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function updatePlayerStrength(token, data) {

    const response = await axios.put(`${baseUrl}/player/update-strength`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function addFunds(token, data) {

    const response = await axios.post(`${baseUrl}/user/add-currency`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getBalance(token, data) {

    const response = await axios.post(`${baseUrl}/user/get-balance`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function createPlayer(token, data) {

    const response = await axios.post(`${baseUrl}/manager/add-player`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getMyPlayers(token) {

    const response = await axios.get(`${baseUrl}/manager/get-players`, {
        headers: getHeader(token),
    });

    return response;
};

export async function checkPlayerTeam(token, playerId) {

    const response = await axios.post(`${baseUrl}/player/check-player-team`, playerId, {
        headers: getHeader(token),
    });

    return response;
};

export async function searchPlayers(token, keyword) {

    const response = await axios.post(`${baseUrl}/player/search-players`, keyword, {
        headers: getHeader(token),
    });

    return response;
};

export async function createTeam(token, data) {

    const response = await axios.post(`${baseUrl}/team/create-team`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getManagerTeams(token) {

    const response = await axios.get(`${baseUrl}/manager/get-teams`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getTeam(token, teamId) {

    const response = await axios.get(`${baseUrl}/team/get-team/${teamId}`, {
        headers: getHeader(token),
    });

    return response;
};

export async function addPlayerToTeam(token, teamId, playerId) {

    const response = await axios.post(`${baseUrl}/team/add-player`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateTeamBasicInfo(token, data) {

    const response = await axios.put(`${baseUrl}/team/update-team`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getPlayer(token, playerId) {

    const response = await axios.get(`${baseUrl}/player/get-player/${playerId}`, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateManagerPlayer(token, playerId, data) {

    const response = await axios.put(`${baseUrl}/manager/update-player/${playerId}`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function sendTeamInvitation(token, playerId, teamId) {

    const response = await axios.post(`${baseUrl}/team/send-invitation`, { playerId, teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function myTeamInvitations(token) {

    const response = await axios.get(`${baseUrl}/player/team-invitations`, {
        headers: getHeader(token),
    });

    return response;
};

export async function rejectInvitation(token, teamId) {

    const response = await axios.post(`${baseUrl}/player/reject-invitation`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function acceptInvitation(token, teamId) {

    const response = await axios.post(`${baseUrl}/player/accept-invitation`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function getNotifications(token) {

    const response = await axios.get(`${baseUrl}/notifications`, {
        headers: getHeader(token),
    });

    return response;
};

export async function markSeenNotification(token, id) {

    const response = await axios.put(`${baseUrl}/notifications/${id}/mark-seen`, {}, {
        headers: getHeader(token),
    });

    return response;
};

export async function getAllTeams(token, currentPage, limit) {

    const response = await axios.get(`${baseUrl}/team/all-teams?page=${currentPage}&limit=${limit}`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getAllPlayers(token, currentPage, limit) {

    const response = await axios.get(`${baseUrl}/player/all-players?page=${currentPage}&limit=${limit}`, {
        headers: getHeader(token),
    });

    return response;
};

export const getTeamsBySearch = async (token, currentPage, limit, keyword) => {

    const response = await axios.post(`${baseUrl}/team/search-teams?page=${currentPage}&limit=${limit}`, { keyword }, {
        headers: getHeader(token),
    });
    return response;
};

export async function getPlayersBySearch(token, currentPage, limit, keyword) {

    const response = await axios.post(`${baseUrl}/player/search-all-players?page=${currentPage}&limit=${limit}`, { keyword }, {
        headers: getHeader(token),
    });

    return response;
};

export async function checkPlayerManager(token, playerId, managerId) {

    const response = await axios.post(`${baseUrl}/player/check-player-manager`, { playerId, managerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function checkManagerTeam(token, teamId, managerId) {

    const response = await axios.post(`${baseUrl}/team/check-team-manager`, { teamId, managerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function SendJoinReqToTeam(token, teamId) {

    const response = await axios.post(`${baseUrl}/player/send-join-req-team`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function playerTeamJoinRequests(token) {

    const response = await axios.get(`${baseUrl}/team/player-join-requests`, {
        headers: getHeader(token),
    });

    return response;
};

export async function playerJoinReqAccept(token, teamId, playerId) {

    const response = await axios.post(`${baseUrl}/team/join-requests-accept`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function playerJoinReqReject(token, teamId, playerId) {

    const response = await axios.post(`${baseUrl}/team/join-requests-reject`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function checkTeamContract(token, teamId, playerId) {

    const response = await axios.post(`${baseUrl}/team/check-team-contract`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function sendContractOffer(token, data, playerId) {

    const response = await axios.post(`${baseUrl}/manager/send-contract-offer/${playerId}`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getPlayerContractOffers(token) {

    const response = await axios.get(`${baseUrl}/player/contract-offers`, {
        headers: getHeader(token),
    });

    return response;
};

export async function acceptContract(token, teamId, playerId) {

    const response = await axios.post(`${baseUrl}/player/accept-contract`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function rejectContract(token, teamId, playerId) {

    const response = await axios.post(`${baseUrl}/player/reject-contract`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function getFields(token, currentPage, limit) {

    const response = await axios.get(`${baseUrl}/fields?page=${currentPage}&limit=${limit}`, {
        headers: getHeader(token),
    });

    return response;
};

export const getFieldsBySearch = async (token, currentPage, limit, keyword) => {

    const response = await axios.post(`${baseUrl}/fields/search-fields?page=${currentPage}&limit=${limit}`, { keyword }, {
        headers: getHeader(token),
    });
    return response;
};

export const addField = async (token, data) => {

    const response = await axios.post(`${baseUrl}/fields/add-field`, data, {
        headers: getHeader(token),
    });
    return response;
};

export async function getAllFields(token) {

    const response = await axios.get(`${baseUrl}/fields/all-fields`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getAllReferees(token) {

    const response = await axios.get(`${baseUrl}/referee/all-referees`, {
        headers: getHeader(token),
    });

    return response;
};

export async function createMatch(token, data) {

    const response = await axios.post(`${baseUrl}/match/create-match`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getMatch(token, matchId) {

    const response = await axios.get(`${baseUrl}/match/${matchId}`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getAllMatches(token, currentPage, limit) {

    const response = await axios.get(`${baseUrl}/match/all-matches?page=${currentPage}&limit=${limit}`, {
        headers: getHeader(token),
    });

    return response;
};

export async function addTeamToMatch(token, matchId, teamId) {

    const response = await axios.post(`${baseUrl}/match/add-team-to-match`, { matchId, teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function addPlayerToMatch(token, matchId, playerId) {

    const response = await axios.post(`${baseUrl}/match/add-player-to-match`, { matchId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateConfirmTeam(token, data, matchId) {

    const response = await axios.put(`${baseUrl}/match/update-confirm-team/${matchId}`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function removeTeamFromMatch(token, matchId, teamId) {

    const response = await axios.post(`${baseUrl}/match/remove-team-from-match`, { matchId, teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function removePlayerFromMatch(token, matchId, playerId) {

    const response = await axios.post(`${baseUrl}/match/remove-player-from-match`, { matchId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function sendTeamJoinReqForMatch(token, matchId, teamId) {

    const response = await axios.post(`${baseUrl}/match/team-join-req-send`, { matchId, teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function sendPlayerJoinReqForMatch(token, matchId, playerId) {

    const response = await axios.post(`${baseUrl}/match/player-join-req-send`, { matchId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function rejectTeamJoinReqForMatch(token, matchId, teamId) {

    const response = await axios.post(`${baseUrl}/match/team-join-req-reject`, { matchId, teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function rejectPlayerJoinReqForMatch(token, matchId, playerId) {

    const response = await axios.post(`${baseUrl}/match/player-join-req-reject`, { matchId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function createReminder(token, data) {

    const response = await axios.post(`${baseUrl}/reminder/create-reminder`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getManagerTeamsForReminder(token) {

    const response = await axios.get(`${baseUrl}/manager/get-teams-for-reminder`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getManagerCreatedReminders(token) {

    const response = await axios.get(`${baseUrl}/manager/created-reminders`, {
        headers: getHeader(token),
    });

    return response;
};

export async function reminderMarkRead(token, reminderId, userId) {

    const response = await axios.post(`${baseUrl}/manager/user-reminder-mark-read`, { reminderId, userId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function deleteReminder(token, reminderId) {

    const response = await axios.delete(`${baseUrl}/reminder/delete/${reminderId}`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getUserReminders(token) {

    const response = await axios.get(`${baseUrl}/reminder`, {
        headers: getHeader(token),
    });

    return response;
};

export async function stopReminder(token, reminderId) {

    const response = await axios.patch(`${baseUrl}/reminder/stop/${reminderId}`, {}, {
        headers: getHeader(token),
    });

    return response;
};

export async function resumeReminder(token, reminderId) {

    const response = await axios.patch(`${baseUrl}/reminder/resume/${reminderId}`, {}, {
        headers: getHeader(token),
    });

    return response;
};