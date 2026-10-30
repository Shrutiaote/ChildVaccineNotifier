
package com.childvaccination.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.childvaccination.entity.VaccinationCentre;
import com.childvaccination.service.VaccinationCentreService;

@RestController
@RequestMapping("/api/vaccination-centres")
@CrossOrigin(origins = "http://localhost:5173")
public class VaccinationCentreController {

    private final VaccinationCentreService centreService;

    public VaccinationCentreController(
            VaccinationCentreService centreService) {
        this.centreService = centreService;
    }

    // Add a new vaccination centre
    @PostMapping
    public ResponseEntity<VaccinationCentre> addCentre(
            @RequestBody VaccinationCentre centre) {

        VaccinationCentre savedCentre =
                centreService.saveCentre(centre);

        return new ResponseEntity<>(
                savedCentre, HttpStatus.CREATED);
    }

    // Get all vaccination centres
    @GetMapping
    public ResponseEntity<List<VaccinationCentre>> getAllCentres() {

        return ResponseEntity.ok(
                centreService.getAllCentres());
    }

    // Get vaccination centre by ID
    @GetMapping("/{id}")
    public ResponseEntity<VaccinationCentre> getCentreById(
            @PathVariable Long id) {

        return centreService.getCentreById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update vaccination centre
    @PutMapping("/{id}")
    public ResponseEntity<VaccinationCentre> updateCentre(
            @PathVariable Long id,
            @RequestBody VaccinationCentre updatedCentre) {

        return centreService.getCentreById(id)
                .map(existingCentre -> {

                    existingCentre.setName(updatedCentre.getName());
                    existingCentre.setCentreType(updatedCentre.getCentreType());
                    existingCentre.setAddress(updatedCentre.getAddress());
                    existingCentre.setCity(updatedCentre.getCity());
                    existingCentre.setState(updatedCentre.getState());
                    existingCentre.setPinCode(updatedCentre.getPinCode());
                    existingCentre.setContactNumber(updatedCentre.getContactNumber());
                    existingCentre.setAvailableVaccines(updatedCentre.getAvailableVaccines());
                    existingCentre.setVaccinationDays(updatedCentre.getVaccinationDays());
                    existingCentre.setVaccinationTimings(updatedCentre.getVaccinationTimings());
                    existingCentre.setFees(updatedCentre.getFees());
                    existingCentre.setMapLink(updatedCentre.getMapLink());
                    existingCentre.setActive(updatedCentre.isActive());

                    VaccinationCentre savedCentre =
                            centreService.saveCentre(existingCentre);

                    return ResponseEntity.ok(savedCentre);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete vaccination centre
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCentre(
            @PathVariable Long id) {

        if (centreService.getCentreById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        centreService.deleteCentre(id);
        return ResponseEntity.noContent().build();
    }
    

    // Search vaccination centres by city
    @GetMapping("/search/city")
    public ResponseEntity<List<VaccinationCentre>> searchByCity(
            @RequestParam String city) {

        return ResponseEntity.ok(
                centreService.searchByCity(city));
    }

    // Search vaccination centres by PIN code
    @GetMapping("/search/pincode")
    public ResponseEntity<List<VaccinationCentre>> searchByPinCode(
            @RequestParam String pinCode) {

        return ResponseEntity.ok(
                centreService.searchByPinCode(pinCode));
    }
    
 // Filter vaccination centres by type
    @GetMapping("/filter")
    public ResponseEntity<List<VaccinationCentre>> filterByCentreType(
            @RequestParam String centreType) {

        return ResponseEntity.ok(
                centreService.filterByCentreType(centreType));
    }

}
