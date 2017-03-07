package umm3601.flower;

import com.mongodb.MongoClient;
import com.mongodb.client.*;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.io.IOException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

public class FlowerController {

    private final MongoCollection<Document> flowerCollection;

    public FlowerController() throws IOException {
        // Set up our server address
        // (Default host: 'localhost', default port: 27017)
        // ServerAddress testAddress = new ServerAddress();

        // Try connecting to the server
        //MongoClient mongoClient = new MongoClient(testAddress, credentials);
        MongoClient mongoClient = new MongoClient(); // Defaults!

        // Try connecting to a database
        MongoDatabase db = mongoClient.getDatabase("test");

        flowerCollection = db.getCollection("flowers");
    }

    // List flowers
    public String listFlowers(Map<String, String[]> queryParams) {
        Document filterDoc = new Document();

        if (queryParams.containsKey("cultivar")) {
            String targetCultivar = queryParams.get("cultivar")[0];
            filterDoc = filterDoc.append("cultivar", targetCultivar);
        }

        if (queryParams.containsKey("source")) {
            String targetSource = queryParams.get("source")[0];
            filterDoc = filterDoc.append("source", targetSource);
        }

        if (queryParams.containsKey("gardenLocation")) {
            String targetLocation = queryParams.get("gardenLocation")[0];
            filterDoc = filterDoc.append("gardenLocation", targetLocation);
        }

        if (queryParams.containsKey("year")) {
            int targetYear = Integer.parseInt(queryParams.get("year")[0]);
            filterDoc = filterDoc.append("year", targetYear);
        }

        FindIterable<Document> matchingFlowers = flowerCollection.find(filterDoc);

        return JSON.serialize(matchingFlowers);
    }

    // Get a single flower
    public String getFlower(String id) {
        FindIterable<Document> jsonFlowers
                = flowerCollection
                .find(eq("_id", new ObjectId(id)));

        Iterator<Document> iterator = jsonFlowers.iterator();

        Document flower = iterator.next();

        return flower.toJson();
    }

    // Get all the names of the beds in the DB
    public String listBeds() {
        Document output = new Document();
        DistinctIterable<String> beds
                = flowerCollection
                .distinct("gardenLocation",String.class);

        for (String bed: beds){
            output.append(bed,bed);
        }

        return output.toJson();
    }



    // Get the average age of all users by company
//    public String getAverageAgeByCompany() {
//        AggregateIterable<Document> documents
//                = userCollection.aggregate(
//                Arrays.asList(
//                        Aggregates.group("$company",
//                                Accumulators.avg("averageAge", "$age")),
//                        Aggregates.sort(Sorts.ascending("_id"))
//                ));
//        System.err.println(JSON.serialize(documents));
//        return JSON.serialize(documents);
//    }
}
