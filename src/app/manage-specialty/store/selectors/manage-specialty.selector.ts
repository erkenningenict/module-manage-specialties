import { createSelector } from '@ngrx/store';

import * as fromLists from '../selectors/lists.selector';
import * as fromFeature from '../reducers';
import * as fromManageSpecialty from '../reducers/manage-specialty.reducer';

export const getManageSpecialtyState = createSelector(
  fromFeature.getManageSpecialtyStoreState,
  (state: fromFeature.ManageSpecialtyState) => state.specialty,
);

export const getManageSpecialtyLoading = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getLoading,
);
export const getError = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getError,
);
export const getSuccess = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getSuccess,
);
export const getManageSpecialtyLoaded = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getLoaded,
);

export const getManageSpecialtyItem = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getSpecialty,
);

export const getEnableEditing = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getEnableEditing,
);

export const getEnableEditingMain = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getEnableEditingMain,
);

export const getShowComments = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getShowComments,
);

export const getStatus = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getStatus,
);
export const getVakgroepId = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getVakgroepID,
);
export const getFactuurId = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getFactuurId,
);
export const getIsHoogleraar = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getIsHoogleraar,
);
export const getisVakcommissieAG = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getisVakcommissieAG,
);
export const getVakgroepNaam = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getVakgroepNaam,
);
export const getTitelData = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getTitelData,
);
export const getPromotietekst = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getPromotietekst,
);
export const getPromotietekstData = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getPromotietekstData,
);

export const getThemaId = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getThemaId,
);

export const getCompetentieId = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getCompetentieId,
);

export const getGekozenVaardigheden = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getGekozenVaardigheden,
);

export const getGekozenKennisgebieden = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getGekozenKennisgebieden,
);

export const getGeldigeCompetentiesPerThema = createSelector(
  getManageSpecialtyItem,
  fromLists.getGeldigeCompetenties,
  fromLists.getCompetenties,
  (manageSpecialty, geldigeCompetenties, allCompetenties) => {
    const competenties = geldigeCompetenties
      .filter((t) => t.ThemaID === manageSpecialty.ThemaID)
      .map((c) => c.CompetentieID);
    if (manageSpecialty.ThemaID === 24) {
      return allCompetenties.filter((c) => c.CompetentieID === 22);
    }
    return allCompetenties.filter((c) =>
      competenties.includes(c.CompetentieID),
    );
  },
);

export const getInhoud = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getInhoud,
);
export const getGeintegreerdeGewasbescherming = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getGeintegreerdeGewasbescherming,
);

export const getPreventieveMaatregelen = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getPreventieveMaatregelen,
);
export const getTeelttechnischeMaatregelen = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getTeelttechnischeMaatregelen,
);
export const getWaarschuwingEnAdviesSystemen = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getWaarschuwingEnAdviesSystemen,
);
export const getNietChemischeMogelijkheden = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getNietChemischeMogelijkheden,
);
export const getChemischeGewasbescherming = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getChemischeGewasbescherming,
);
export const getEmissieBeperking = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getEmissieBeperking,
);
export const getDoelstelling = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDoelstelling,
);
export const getDoelstellingS = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDoelstellingS,
);
export const getDoelstellingM = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDoelstellingM,
);
export const getDoelstellingA = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDoelstellingA,
);
export const getDoelstellingR = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDoelstellingR,
);
export const getDoelstellingT = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDoelstellingT,
);
export const getActualiteit = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getActualiteit,
);
export const getIndividueleRelevantie = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getIndividueleRelevantie,
);
export const getRelevanteActualiteiten = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getRelevanteActualiteiten,
);
export const getWerkvormData = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getWerkvormData,
);
export const getDocenten = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDocenten,
);
export const getEvaluatieWijze = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getEvaluatieWijze,
);
export const getMateriaal = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getMateriaal,
);
export const getWebsite = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getWebsite,
);
export const getWerkvormSchema = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getWerkvormSchema,
);

export const getKostenPerDeelname = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getKostenPerDeelname,
);
export const getGroepsgrootte = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getGroepsgrootte,
);
export const getBegindatum = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getBegindatum,
);
export const getEinddatum = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getEinddatum,
);
export const getEnableEditingEinddatum = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getEnableEditingEinddatum,
);
export const getAantalSessies = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getAantalSessies,
);
export const getTijdsduur = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getTijdsduur,
);
export const getDigitaalAanbod = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDigitaalAanbod,
);
export const getBijlagen = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getBijlagen,
);

export const getChangeLog = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getChangeLog,
);

export const getDiscussions = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDiscussions,
);

export const getShowBeoordelingData = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getShowBeoordelingData,
);
export const getBeoordeling = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getBeoordeling,
);
export const getCanUpdateBeoordelaar = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getCanUpdateBeoordelaar,
);
export const getCanUpdateBeoordeling = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getCanUpdateBeoordeling,
);

export const getCurrentTabIndex = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getCurrentTabIndex,
);
export const getInvalidControls = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getInvalidControls,
);
export const getAllControls = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getAllControls,
);
export const getAllJudgementControls = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getAllJudgementControls,
);
export const getBeoordelingTabDisabled = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getBeoordelingTabDisabled,
);
export const getTitel = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getTitel,
);
export const getShowIndienenButton = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getShowIndienenButton,
);

export const getDatumAangemaakt = createSelector(
  getManageSpecialtyState,
  fromManageSpecialty.getDatumAangemaakt,
);
