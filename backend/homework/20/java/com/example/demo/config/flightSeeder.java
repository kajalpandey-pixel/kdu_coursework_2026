package com.example.demo.config;

import com.example.demo.model.Flight;
import com.example.demo.model.FlightStatus;
import com.example.demo.repositories.FlightRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Random;

@Component
public class flightSeeder implements CommandLineRunner {

    private final FlightRepository repository;

    public flightSeeder(FlightRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {

        if (repository.count() > 0) {
            System.out.println("Database already seeded!");
            return;
        }

        String[] cities = {
                "Delhi", "Mumbai", "Bangalore",
                "Chennai", "Hyderabad", "Kolkata",
                "Pune", "Ahmedabad"
        };

        Random random = new Random();

        for (int i = 1; i <= 30 ; i++) {

            String source = cities[random.nextInt(cities.length)];
            String destination = cities[random.nextInt(cities.length)];

            while (destination.equals(source)) {
                destination = cities[random.nextInt(cities.length)];
            }

            Flight flight = new Flight();


            flight.setSource(source);
            flight.setDestination(destination);
            flight.setDepartureTime(new Date(System.currentTimeMillis() + (long) random.nextInt(200) * 3600 * 1000));

            flight.setTotalSeats(100 + random.nextInt(100));
            flight.setAllSeatCount(flight.getTotalSeats());


            flight.setTicketPrice(3000 + random.nextInt(7000));

            flight.setUpdateVersion(flight.getUpdateVersion());
            flight.setStatus(FlightStatus.ACTIVE);

            repository.save(flight);
        }

        System.out.println("30 Flights Seeded Successfully!");
    }
}