
package com.childvaccination.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.childvaccination.entity.Child;
import com.childvaccination.service.ChildService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/children")
@CrossOrigin(origins = {
	    "http://localhost:5173",
	    "null"
	})
public class ChildController {

    private final ChildService childService;

    public ChildController(ChildService childService) {
        this.childService = childService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Child createChild(@Valid @RequestBody Child child) {
        return childService.saveChild(child);
    }

    @GetMapping
    public List<Child> getAllChildren() {
        return childService.getAllChildren();
    }

    @GetMapping("/{id}")
    public Child getChildById(@PathVariable Long id) {
        Child child = childService.getChildById(id);

        if (child == null) {
            throw new org.springframework.web.server.ResponseStatusException(
                HttpStatus.NOT_FOUND, "Child not found"
            );
        }

        return child;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteChild(@PathVariable Long id) {
        childService.deleteChild(id);
    }
}
