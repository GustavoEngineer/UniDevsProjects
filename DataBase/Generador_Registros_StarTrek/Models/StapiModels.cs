using Newtonsoft.Json;
using System.Collections.Generic;

namespace StarTrekDataGenerator.Models.StapiModels
{
    // Base Response for STAPI
    public class StapiResponse<T>
    {
        public required List<T> StapiEntities { get; set; }
        public required Page Page { get; set; }
    }

    public class Page
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalElements { get; set; }
        public int TotalPages { get; set; }
        public required string Sort { get; set; }
    }

    // STAPI Character Model (for Captains)
    public class StapiCharacter
    {
        [JsonProperty("uid")]
        public required string Uid { get; set; }
        [JsonProperty("name")]
        public required string Name { get; set; }
        [JsonProperty("gender")]
        public required string Gender { get; set; }
        [JsonProperty("dateOfBirth")]
        public required string DateOfBirth { get; set; }
        [JsonProperty("bloodType")]
        public required string BloodType { get; set; }
        [JsonProperty("status")]
        public required string Status { get; set; }
        [JsonProperty("rank")]
        public required string Rank { get; set; } // This is useful for filtering captains
        [JsonProperty("characterSpecies")]
        public required List<StapiSpecies> CharacterSpecies { get; set; } // Linked species
        [JsonProperty("characterPlanets")]
        public required List<StapiPlanet> CharacterPlanets { get; set; } // Linked planets
    }

    // STAPI Organization Model (for Empires)
    public class StapiOrganization
    {
        [JsonProperty("uid")]
        public required string Uid { get; set; }
        [JsonProperty("name")]
        public required string Name { get; set; }
        [JsonProperty("membership")]
        public required string Membership { get; set; }
        [JsonProperty("government")]
        public required string Government { get; set; }
    }

    // STAPI Planet Model
    public class StapiPlanet
    {
        [JsonProperty("uid")]
        public required string Uid { get; set; }
        [JsonProperty("name")]
        public required string Name { get; set; }
        [JsonProperty("gravity")]
        public double? Gravity { get; set; }
        [JsonProperty("habitable")]
        public bool? Habitable { get; set; }
        [JsonProperty("averagePopulation")]
        public long? AveragePopulation { get; set; } // Can map to Poblacion_Total
    }

    // STAPI Species Model (for Razas)
    public class StapiSpecies
    {
        [JsonProperty("uid")]
        public required string Uid { get; set; }
        [JsonProperty("name")]
        public required string Name { get; set; }
        [JsonProperty("warpCapableSpecies")]
        public bool? WarpCapableSpecies { get; set; }
        [JsonProperty("designation")]
        public required string Designation { get; set; }
    }

    // STAPI Ship Model (for Naves)
    public class StapiShip
    {
        [JsonProperty("uid")]
        public required string Uid { get; set; }
        [JsonProperty("name")]
        public required string Name { get; set; }
        [JsonProperty("dateStatus")] // e.g., "Active"
        public required string DateStatus { get; set; }
        [JsonProperty("registry")] // NCC-xxxx
        public required string Registry { get; set; }
        [JsonProperty("shipClass")] // e.g., "Constitution Class"
        public required string ShipClass { get; set; }
    }
}