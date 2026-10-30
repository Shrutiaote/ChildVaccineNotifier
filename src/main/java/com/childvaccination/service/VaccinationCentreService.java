
package com.childvaccination.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.childvaccination.entity.VaccinationCentre;
import com.childvaccination.repository.VaccinationCentreRepository;

@Service
public class VaccinationCentreService {

    private final VaccinationCentreRepository centreRepository;

    public VaccinationCentreService(
            VaccinationCentreRepository centreRepository) {
        this.centreRepository = centreRepository;
    }

    // Add a new vaccination centre
    public VaccinationCentre saveCentre(VaccinationCentre centre) {
        return centreRepository.save(centre);
    }

    // Get all vaccination centres
    public List<VaccinationCentre> getAllCentres() {
        return centreRepository.findAll();
    }

    // Get vaccination centre by ID
    public Optional<VaccinationCentre> getCentreById(Long id) {
        return centreRepository.findById(id);
    }

    // Delete vaccination centre
    public void deleteCentre(Long id) {
        centreRepository.deleteById(id);
    }
    
    // Search vaccination centres by city
    public List<VaccinationCentre> searchByCity(String city) {
        return centreRepository.findByCityContainingIgnoreCase(city);
    }

    // Search vaccination centres by PIN code
    public List<VaccinationCentre> searchByPinCode(String pinCode) {
        return centreRepository.findByPinCode(pinCode);
    }
    
 // Filter vaccination centres by type
    public List<VaccinationCentre> filterByCentreType(String centreType) {
        return centreRepository.findByCentreTypeIgnoreCase(centreType);
    }
}
